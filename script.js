document.getElementById('imageUpload').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const filenameSpan = document.getElementById('filename');
    filenameSpan.innerText = file.name;

    // Show the tick button
    const tickButton = document.getElementById('tickButton');
    tickButton.style.display = 'inline-block';
  } 
});

// Import necessary Firebase storage functions
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';
import { getDatabase, ref as sRef, set, onValue } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { app } from './firebase-config.js';  // Update the path accordingly
import { database } from './firebase-config.js';  // Update the path accordingly

const db = getDatabase();
const dbRef = sRef(getDatabase());

function modifyImageName(name) {
  // Replace invalid characters with underscores
  return name.replace(/[.#$\[\]]/g, '_');
}

document.getElementById('tickButton').addEventListener('click', function () {
  const file = document.getElementById('imageUpload').files[0];

  const metaData = {
    contentType: file.type
  }

  // Create a storage reference from our Firebase Storage
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + file.name);

  // Upload file 
  const uploadTask = uploadBytesResumable(storageRef, file, metaData);

  uploadTask.on('state-changed', (snapshot)  => {
    // Get the progress status
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload Progress: ', progress);

    if (Math.round(progress) == 100) {
      document.getElementById('filename').innerText = file.name + " successfully uploaded!";
    } else {
      document.getElementById('filename').innerText = file.name + " " + Math.round(progress) + "% uploaded...";
    }
  },
  
  (error) => {
    console.error('Upload Failed:', error);
  }, 
  
  () => {
    // Get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('Download URL:', downloadURL);

      const downloadRef = sRef(db, 'college/' + modifyImageName(file.name));
      set(downloadRef, downloadURL)
            .then(() => {
                console.log('Download URL stored in the database:', downloadURL);
            })
            .catch(error => {
                console.error('Error storing download URL:', error);
            });
    });
  }
  );
});
