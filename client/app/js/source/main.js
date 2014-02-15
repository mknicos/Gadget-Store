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
  //Called when createUser button is clicked
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
  //Takes in an object from server response, adds to user Array, and calls putUSerOnScreen function
    console.log('Post Successful');
    console.log(response[0]);
    putUserOnScreen(response[0]);
    userArray.push(response[0]);
  }


  function putUserOnScreen(user){
  // Will take in one user object and post to user table with a buy button in frst collumn
    console.log(user);
    debugger;
    var $userName = $('<td>').text(user.name).addClass('userName');
    var $userBalance = $('<td>').text(user.cash).addClass('userrBalance');
    var $userItems = $('<td>').text('No Items Bought').addClass('userItems');
    var $row = $('<tr>').data('id', user._id);
// reuse for gadget section  var $button = $('<button>').addClass('tiny round buy');
    $row.append($userName, $userBalance, $userItems);
    $('#userTable').append($row);
  }


})();

