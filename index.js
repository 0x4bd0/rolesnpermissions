const _ = require('lodash');

var perm = function(user) {
    if (typeof user !== "object") throw new TypeError("Perm requires a valide object parameter");
    this.user=user;
    this.logic=true;
    this.checked=0;
    this.continue=1;
  };

  perm.prototype.can = function(permission) {

    if(this.continue==1)
    {
        console.log('can')

        const reducedPermissions=[];
        _.forEach(this.user.permissions, function(value) {
            reducedPermissions.push(value.name)
          });
        if(_.includes(reducedPermissions, permission))
            {
                this.logic=this.logic*true
            } 
            else{
                this.logic=this.logic*false
            }
            this.checked=1;
            this.logic==false?this.continue=0:""
    }
    return this;
    
  };

  perm.prototype.inTeam = function(team) {
    if(this.continue==1)
    {
        console.log('team')
        const reducedPermissions=[];
        _.forEach(this.user.services, function(value) {
            reducedPermissions.push(value.name)
          });
          if(typeof team =="string")
          {
            if(_.includes(reducedPermissions, team))
            {
                this.logic=this.logic*true
            } 
            else{
                this.logic=this.logic*false
            }
          }
          else if(typeof team =="object")
          {
            if(_.difference(team,reducedPermissions).length === 0)
            {
                this.logic=this.logic*true
            } 
            else{
                this.logic=this.logic*false
            }
          }
          this.checked=1;
          this.logic==false?this.continue=0:""
    
    }
    return this;
     
  };

  perm.prototype.inRegion = function(region) {
    if(this.continue==1)
    {
        console.log('region')

        const reducedPermissions=[];
        _.forEach(this.user.regions, function(value) {
            reducedPermissions.push(value.name)
          });
        if(typeof region =="string")
        {
          if(_.includes(reducedPermissions, region))
          {
              this.logic=this.logic*true
          } 
          else{
              this.logic=this.logic*false
          }
        }
        else if(typeof region =="object")
        {
          if(_.difference(region,reducedPermissions).length === 0)
          {
              this.logic=this.logic*true
          } 
          else{
              this.logic=this.logic*false
          }
        }
        this.checked=1;
        this.logic==false?this.continue=0:""
    
          
    }
   
    return this;
};

perm.prototype.inCountry = function(country) {
    if(this.continue==1)
    {
        console.log('country')

        const reducedPermissions=[];
        _.forEach(this.user.countries, function(value) {
            reducedPermissions.push(value.name)
          });
        if(typeof country =="string")
        {
          if(_.includes(reducedPermissions, country))
          {
              this.logic=this.logic*true
          } 
          else{
              this.logic=this.logic*false
          }
        }
        else if(typeof country =="object")
        {
          if(_.difference(country,reducedPermissions).length === 0)
          {
              this.logic=this.logic*true
          } 
          else{
              this.logic=this.logic*false
          }
        }
        this.checked=1;
        this.logic==false?this.continue=0:""
    
         
    }
 
    return this;
};
  

  perm.prototype.check = function() {  
    return  this.checked==0?"Please perfom a check first": this.logic;
  };

  module.exports=perm;
