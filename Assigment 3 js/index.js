var websiteName = document.getElementById("websiteName")
var websiteUrl = document.getElementById("websiteUrl")

var bookmarks 

if (localStorage.getItem("bookmarks") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    displayWeb()
} else{
    bookmarks = []
}


function addName(){

    var bookmark = {
        name: websiteName.value ,
        url:  websiteUrl.value
    }


    
    bookmarks.push(bookmark)
    displayWeb()
    clearForm()
    


    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    console.log(bookmarks);
}



function displayWeb(){
   
    var trs = "";
    for( var i = 0 ; i < bookmarks.length ; i++){
         trs += `<tr>
         <td>${i}</td>
         <td>${bookmarks[i].name}</td>
         <td><a href = "${bookmarks[i].url}" target = "blank" class="btn btn-success"><i class="fa-solid fa-eye"></i>  Visit</a></td>
         <td><button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
         </tr>`;
     }

     document.getElementById("tableContent").innerHTML = trs;

   
}

function clearForm(){
    websiteName.value = ""
    websiteUrl.value = ""
}

function deleteBookmark(index){
    
  
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton:  "btn btn-danger m-2",
          cancelButton: "btn btn-success"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            bookmarks.splice(index , 1)
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
            displayWeb()
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your Bookmark has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary Bookmark is safe :)",
            icon: "error"
          });
        }
      });
}

/^[a-z]$/