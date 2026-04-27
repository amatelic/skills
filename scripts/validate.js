const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '..', 'skills');

function validateSkills() {
  let hasErrors = false;
  
  if (!fs.existsSync(skillsDir)) {
    console.error('❌ No skills directory found');
    process.exit(1);
  }
  
  const entries = fs.readdirSync(skillsDir);
  
  for (const entry of entries) {
    const skillPath = path.join(skillsDir, entry);
    const stat = fs.statSync(skillPath);
    
    if (stat.isDirectory()) {
      const skillFile = path.join(skillPath, 'SKILL.md');
      
      if (!fs.existsSync(skillFile)) {
        console.error(`❌ ${entry}: Missing SKILL.md`);
        hasErrors = true;
        continue;
      }
      
      const content = fs.readFileSync(skillFile, 'utf8');
      
      // Check frontmatter
      if (!content.startsWith('---')) {
        console.error(`❌ ${entry}: Missing frontmatter`);
        hasErrors = true;
        continue;
      }
      
      const frontmatter = content.match(/---\n([\s\S]*?)\n---/);
      if (!frontmatter) {
        console.error(`❌ ${entry}: Invalid frontmatter format`);
        hasErrors = true;
        continue;
      }
      
      const meta = parseFrontmatter(frontmatter[1]);
      
      if (!meta.name) {
        console.error(`❌ ${entry}: Missing 'name' in frontmatter`);
        hasErrors = true;
      }
      
      if (!meta.description) {
        console.error(`❌ ${entry}: Missing 'description' in frontmatter`);
        hasErrors = true;
      }
      
      if (hasErrors) {
        console.log(`✅ ${entry}: Valid`);
      }
    }
  }
  
  if (hasErrors) {
    console.error('\n❌ Validation failed');
    process.exit(1);
  } else {
    console.log('\n✅ All skills are valid\n');
  }
}

function parseFrontmatter(content) {
  const meta = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      meta[match[1]] = match[2].trim();
    }
  }
  
  return meta;
}

validateSkills();