const mocha=require('mocha')
const assert = require('assert')
const perm = require('../index')
const user=
{
    "name":"dix",
    "permissions":[
    {"name":"create-user"},
    {"name":"create-bill"},
    ],
    "roles":["admin"],
    "services":[
        {"name":"IT"},
        {"name":"economical"}
    ],
    "regions":[
        {"name":"Algiers"},
        {"name":"Oran"}
    ],
    "countries":[
        {"name":"Algeria"},
        {"name":"Tunisia"}
    ]
}
describe('Nothing passed to check',function(){
    it('returns perform check first',function(done){
        assert( new perm(user).check()=="Please perfom a check first") 
        done() 
    })
})

describe('Did not pass an object',function(){
   
    it('Passed a STRING',function(done){
        assert.throws(function () { new perm("user")}, TypeError, "Perm requires a valide object parameter");
        done();
    })
    it('Passed a INTEGER',function(done){
        assert.throws(function () { new perm(2) }, TypeError, "Perm requires a valide object parameter");
        done();
    })
})

describe('User has permissions',function(){
    
    it('has CAN permissions',function(done){
      assert( new perm(user).can('create-user').check()==1) 
        done()
    })

    it('has TEAM permissions',function(done){
        assert( new perm(user).inTeam('economical').check()==1) 
          done()
      })

      it('has REGION permissions',function(done){
        assert( new perm(user).inRegion('Algiers').check()==1) 
          done()
      })

      it('has COUNTRY permissions',function(done){
        assert( new perm(user).inCountry('Algeria').check()==1) 
          done()
      })

     

})

describe('User has not permissions',function(){
    it('has NOT CAN permissions',function(done){
        assert( new perm(user).can('delete-user').check()==0) 
          done()
      })
  
      it('has NOT TEAM permissions',function(done){
          assert( new perm(user).inTeam('administration').check()==0) 
            done()
        })
  
        it('has NOT REGION permissions',function(done){
          assert( new perm(user).inRegion('Paris').check()==0) 
            done()
        })
  
        it('has NOT COUNTRY permissions',function(done){
          assert( new perm(user).inCountry('Russia').check()==0) 
            done()
        })
})

describe('Daisy chaining permissions',function(){
    it('Has EVERYTHING',function(done){
        assert( new perm(user).can('create-user').inTeam('IT').inRegion('Algiers').inCountry('Algeria').check()==1) 
        done()
    })
    it('Has CAN hasnot TEAM',function(done){
        assert( new perm(user).can('create-user').inTeam('home').check()==0) 
        done()
    })
    it('Has CAN Has TEAM hasnot REGION',function(done){
        assert( new perm(user).can('create-user').inTeam('IT').inRegion('Paris').check()==0) 
        done()
    })
    it('Has CAN Has TEAM Has REGION hasnot COUNTRY',function(done){
        assert( new perm(user).can('create-user').inTeam('IT').inRegion('Algiers').inCountry('France').check()==0) 
        done()
    })
})

describe('Array of permissions',function(){
    
    it('Is in TEAM array',function(done){
        assert( new perm(user).inTeam(['IT','economical']).check()==1) 
        done()
    })
    it('Is NOT in TEAM array',function(done){
        assert( new perm(user).inTeam(['IT','food']).check()==0) 
        done()
    })

    it('Is in REGION array',function(done){
        assert( new perm(user).inRegion(['Algiers','Oran']).check()==1) 
        done()
    })
    it('Is NOT in REGION array',function(done){
        assert( new perm(user).inRegion(['Algiers','Paris']).check()==0) 
        done()
    })

    it('Is in COUNTRY array',function(done){
        assert( new perm(user).inCountry(['Algeria','Tunisia']).check()==1) 
        done()
    })
    it('Is NOT in COUNTRY array',function(done){
        assert( new perm(user).inCountry(['Algeria','Russia']).check()==0) 
        done()
    })

  
    
})