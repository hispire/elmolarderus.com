// Functions =============================================================

// Check response
function checkResponse( response ) {
  // Check for a successful response
  if (response.retStatus === 'Success') {
    if (response.redirectTo) {
      window.location = response.redirectTo;
      }
    } else {
       alert('Error: ' + response.error);
       } 
}


// Delete User
function deleteData(url, id) {

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this item?');
    
    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: url + id
        }).done(function( response ) {

         checkResponse(response);

            // Update the table
            //populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

// Delete product
$('#productList').on('click', 'li a.linkdeleteproduct', function() {
  var id = $(this).attr('rel');
  deleteData('/admin/products/', id);
  });

