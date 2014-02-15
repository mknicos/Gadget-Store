(function(){

  'use strict';

//global variables
  var userArray = [];

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getUsers();
    $('#createUser').click(createUser);
  }

  function getUsers(){
    
  }

  function createUser(event){
    debugger;
    var name = $('#userName').val();
    var deposit = $('#deposit').val();
    var obj = {name:name, deposit: deposit};
    var url = window.location.origin.replace(/3000/, '4000') + '/users';
    var type = 'POST';
    var success = postSuccess;


    $.ajax({url: url, type: type, data:obj, success: success});
    event.preventDefault();
  }

  function postSuccess(response){
    debugger;
    console.log('Post Successful');
    console.log(response[0]);
    putUserOnScreen(response[0]);
    userArray.push(response[0]);
  }

  function putUserOnScreen(user){
    console.log(user);
    debugger;
    var $userName = $('<td>').addClass('userName');
    var $userBalance = $('<td>').addClass('userrBalance');
    var $userItems = $('<td>').addClass('userItems');
    var $row = $('<tr>');
    console.log('ignore');
    console.log($userName, $userBalance, $userItems, $row);
  }


})();

