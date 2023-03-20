let dogIndex;
              if (getAllUrlParams().pet == null) {
                dogIndex = -1;
              } else {
                dogIndex = getAllUrlParams().pet - 1;
              }


            // read data from JSON file
            fetch('assets/data/data.json')
              .then((response) => response.json())
              .then((data) => {
                if (dogIndex < 0 || dogIndex >= data.length) {
                  document.body.innerHTML = `
                  <h1 style="color: #d50000; font-size: 4em; text-align: center; margin-top: 100px; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.2em;">Error 404: Page not found</h1>
                  <p style="font-size: 1.2em; color: #555; text-align: center; margin-bottom: 50px;">Oops! The page you're looking for doesn't seem to exist.</p>
                  `;
                }
                viewInfo(data[dogIndex])
              })

              .catch(error => {
                  console.error('Error fetching data:', error);
              });


              function viewInfo(dogData) {
                    // Set the pet name, display "N/A" if it is null.
                    document.getElementById("petName").innerHTML = dogData.name == null ? "N/A" : dogData.name;
                    
                    // Set the pet information and display in the webpage
                    document.getElementById("petInfo").innerHTML = `
                      <p class="breed">${dogData.breed == null ? "" : dogData.breed}</p> 
                      <p class="spay-neuter">${dogData.spayNeuter == null ? "" : dogData.spayNeuter}</p>
                      <p class="gender">${dogData.gender == null ? "" : dogData.gender}</p>
                      <p class="age">${dogData.age == null ? "" : "<em class='detail-label'>Age : </em><span class='detail-value'>" + dogData.age + "</span>"}</p>
                      <p class="animal-id">${dogData.animalId == null ? "" : "<em class='detail-label'>Animal Id : </em><span class='detail-value'>" + dogData.animalId + "</span>"}</p>
                      <p class="vaccination-status">${dogData.vaccinationStatus == null ? "" : "<em class='detail-label'>Vaccination Status : </em><span class='detail-value'>" + dogData.vaccinationStatus + "</span>"}</p>
                      <p class="location">${dogData.location == null ? "" : "<em class='detail-label'>Location : </em><span class='detail-value'>" + dogData.location + "</span>"}</p>
                      <p class="available-for-adoption">${dogData.availableForAdoption == null ? "" : "<em class='detail-label'>Available for adoption : </em><span class='detail-value'>" + dogData.availableForAdoption + "</span>"}</p>
                      <p class="type">${dogData.type == null ? "" : "<em>Type : </em><span class='detail-value'>" + dogData.type + "</span>"}</p>
                      <p class="additional-details">${dogData.additionalDetails == null ? "" : "<em class='detail-label'>Additional Details </em><p class='detail-value'>" + dogData.additionalDetails + "</p>"}</p>
                      `;

                    
                    // Set the pet pictures using the image URLs.
                    document.getElementById("p1").innerHTML = `<img src='${dogData.pic1}' alt:'Pic1 of ${dogData.name} height='220' '>`;
                    document.getElementById("p2").innerHTML = `<img src='${dogData.pic2}' alt:'Pic2 of ${dogData.name} height='220' '>`;
                    document.getElementById("p3").innerHTML = `<img src='${dogData.pic3}' alt:'Pic3 of ${dogData.name} height='220' '>`;
                    
                    // Set the background color and text color of the body based on the gender of the dog.
                    document.body.style.background = dogData.gender == 'Male' ? 'linear-gradient(to bottom right, #E6E6E6, #C2C2C2)': 'linear-gradient(to bottom right, #87CEFA, #1E90FF)';
                    document.getElementById("album").style.color = dogData.gender == 'Male' ? 'black': 'blue';
                    
                    // Update the page title to include the dog's name.
                    document.head.childNodes[11].innerText = ( dogIndex + 1 ) + ': ' + dogData.name;
                    
                    
              };

              document.getElementById("footer").innerHTML = `<a href="index.html?page=${Math.floor(dogIndex/6)}" role="button" class="btn btn-outline-dark">Back</a>`;