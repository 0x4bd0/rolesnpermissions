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
        const reducedPermissions=[];
        _.forEach(this.user.data.permissions, function(value) {
            reducedPermissions.push(value.name)
          });
          if(typeof permission =="string")
          {
        if(_.includes(reducedPermissions, permission))
            {
                this.logic*=true
            } 
            else{
                this.logic*=false
            }
          }
          else if(typeof permission =="object")
          {
            if(_.difference(permission,reducedPermissions).length === 0)
            {
                this.logic*=true
            } 
            else{
                this.logic*=false
            }
          }
          this.checked=1;
          this.logic==false?this.continue=0:""

    }
    return this;
    
  };

  perm.prototype.inTeam = function(team) {
    console.log("team : ")
    console.log(team)
    console.log("---------------")
    console.log(this.user.data)
    console.log("---------------")

    if(this.continue==1)
    {
        const reducedPermissions=[];
        _.forEach(this.user.data.services, function(value) {
            reducedPermissions.push(_.toString( value._id))
          });
         
          if(typeof team =="string")
          {
            if(_.includes(reducedPermissions, team))
            {
                this.logic*=true
            } 
            else{
                this.logic*=false
            }
          }
          else if(typeof team =="object")
          {
            if(_.difference(team,reducedPermissions).length === 0)
            {
                this.logic*=true
            } 
            else{
                this.logic*=false
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
        const reducedPermissions=[];
        _.forEach(this.user.data.regions, function(value) {
            reducedPermissions.push(_.toString( value._id))
          });
        if(typeof region =="string")
        {
          if(_.includes(reducedPermissions, region))
          {
              this.logic*=true
          } 
          else{
              this.logic*=false
          }
        }
        else if(typeof region =="object")
        {
          if(_.difference(region,reducedPermissions).length === 0)
          {
              this.logic*=true
          } 
          else{
              this.logic*=false
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
        const reducedPermissions=[];
        _.forEach(this.user.data.countries, function(value) {
            reducedPermissions.push(_.toString( value._id))
          });
        if(typeof country =="string")
        {
          if(_.includes(reducedPermissions, country))
          {
              this.logic*=true
          } 
          else{
              this.logic*=false
          }
        }
        else if(typeof country =="object")
        {
          if(_.difference(country,reducedPermissions).length === 0)
          {
              this.logic*=true
          } 
          else{
              this.logic*=false
          }
        }
        this.checked=1;
        this.logic==false?this.continue=0:""
    
         
    }
 
    return this;
};
  

perm.prototype.check = function(res) {  
    
  return new Promise((resolve,rej)=>{

    this.logic==0?rej(res.status(403).send({
      message:"Missing privilege!"
    })):resolve("1")

   
  })  
};

  module.exports=perm;
