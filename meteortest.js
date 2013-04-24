(function() {
  'use strict';

  var Memos = new Meteor.Collection('memos');

if (Meteor.is_server) {
    Memos.allow({
      insert: function(userId,doc){
        return true;
      },
      update: function(userId, docs, fields, modifier) {
        return true;
      },
      remove: function(userId, docs){
        return true;
      },
      fetch: undefined
    });
    Meteor.publish('all-memos', function(){
      return Memos.find();
    });
  Meteor.startup(function () {
  });
}

if (Meteor.is_client) {
  Meteor.subscribe('all-memos');

  Template.form.events({
    'submit' : function(e,t){
      var name = t.find('input[name=name]');
      var memo = t.find('textarea[name=memo]');
      var row = {
        name : name.value,
        memo : memo.value,
      };
      if( Memos.insert( row ) ){
        memo.value = "";
      }
      return false;
    },
  });
  Template.table.events({
    'click a[name=delete]' : function(e,t){
      //var id = $(e.target).attr("data-rowid");
      var id = e.target.getAttribute("data-rowid");
      if( confirm('delete? '+id) ){
        if( Memos.remove({_id:id}) ){}
      }
      return false;
    },
  });
  Template.table.memos = function(){
    return Memos.find();
  };
}

})();
