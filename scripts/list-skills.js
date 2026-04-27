const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '..', 'skills');

function listSkills() {
  const skills = [];
  
  if (!fs.existsSync(skillsDir)) {
    console.log('No skills directory found');
    return;
  }
  
  const entries = fs.readdirSync(skillsDir);
  
  for (const entry of entries) {
    const skillPath = path.join(skillsDir, entry);
    const stat = fs.statSync(skillPath);
    
    if (stat.isDirectory()) {
      const skillFile = path.join(skillPath, 'SKILL.md');
      
      if (fs.existsSync(skillFile)) {
        const content = fs.readFileSync(skillFile, 'utf8');
        const frontmatter = content.match(/---\n([\s\S]*?)\n---/);
        
        if (frontmatter) {
          const meta = parseFrontmatter(frontmatter[1]);
          skills.push({
            name: entry,
            ...meta
          });
        }
      }
    }
  }
  
  console.log('\n📚 Available Skills:\n');
  skills.forEach(skill => {
    console.log(`  ${skill.name}`);
    console.log(`    Description: ${skill.description || 'N/A'}`);
    console.log(`    Version: ${skill.version || 'N/A'}`);
    console.log();
  });
  
  console.log(`Total: ${skills.length} skills\n`);
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

listSkills();