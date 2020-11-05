document.addEventListener('DOMContentLoaded', function() {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);
        // By default, load the inbox
        load_mailbox('inbox');
    });

function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';

    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}
function send_mail(){
    
      const recipients=document.querySelector('#compose-recipients').value;
      const subject=document.querySelector('#compose-subject').value;
      const body=document.querySelector('#compose-body').value;

      // Send mail
      fetch('/emails',{
        method:'POST',
        body:JSON.stringify({
          recipients:recipients,
          subject:subject,
          body:body,
        })
      })
      .then(response=>response.json())
      .then(result=>{
        console.log(result);
      })
      .catch(error=>{
        console.log('Error:',error);
    });
    return false;
}


function load_mailbox(mailbox) {
  
    // Show the mailbox and hide other views
    
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';

    // Show the mailbox name
    document.querySelector('#email-title').innerHTML = `${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}`;
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
        console.log(emails);
    
        //Build an array containing mails
        var mail=[]
        var k=1
        mail[0]=["sender","subject","timestamp"]
        for(var i=0;i<emails.length;i++){
          var elem=[];
          ['sender','subject','timestamp','read'].forEach(element=>{
            elem.push(emails[i][element]);
          });
          mail[k]=elem
          k++
        }
        console.log(mail)

        //Create a HTML table element
        var table=document.createElement("Table");
        table.border="1";

        //Get the count of columns
        var columnCount=mail[0].length;

        //Add header row
        var row=table.insertRow(-1);
        for(var i=0;i<columnCount;i++){
          var headerCell=document.createElement("TH");
          headerCell.innerHTML=mail[0][i];
          row.appendChild(headerCell);
        }

        //Add the rest rows
        for(var i=1; i<mail.length; i++){
          row=table.insertRow(-1);
          if(mail[i][3]){
            row.setAttribute("id","read");
          }
          else{
            row.setAttribute("id","unread");
          }
          for(var j=0; j<columnCount; j++){
            var cell=row.insertCell(-1);
            cell.innerHTML=mail[i][j];
          }
        }
        var dvTable = document.getElementById("dvTable");
        dvTable.innerHTML="";
        dvTable.appendChild(table);

        //mark as read on clicking the row
        //and call the view function to view email
        $('tr').click(function () {
           $(this).attr('id', 'read');
           console.log($(this).index());
           text=$(this).index()
           text-=1
           console.log(emails[text].id)
           id=emails[text].id
           view(id);
        });   
    });
}

function view(mail){
  fetch(`/emails/${mail}`)
  .then(response => response.json())
  .then(email => {
      // Print email
      console.log(email);

  });
}