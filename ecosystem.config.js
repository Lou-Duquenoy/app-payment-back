module.exports = {
  apps : [{
    name: "API",
    script: 'server.js',
    //watch: '.',
    env : {
      "COMMON_VARIABLE": "true"
    },
    env_production : {
      "NODE_ENV":"production"
    }
  }],

  deploy : {
    production : {
      user : 'ozalentour.com_rl7k68wblag',
      host : '141.95.250.37',
      ref  : 'origin/main',
      repo : 'git@github.com:Ghauspie/api.ozalentour.com.git',
      path : '/var/www/vhosts/ozalentour.com/apin92.ozalentour.com',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 start ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
