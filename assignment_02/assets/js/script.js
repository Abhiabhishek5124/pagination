        index= getAllUrlParams().page;

          if (index==null){
            index=0;
          }

          fetch('assets/data/data.json')
            .then(response => response.json())
            .then(data => {
              if (index < 0 || index >= data.length / 6) {
                document.body.innerHTML = `
                  <h1 style="color: #d50000; font-size: 4em; text-align: center; margin-top: 100px; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.2em;">Error 404: Page not found</h1>
                  <p style="font-size: 1.2em; color: #555; text-align: center; margin-bottom: 50px;">Oops! The page you're looking for doesn't seem to exist.</p>`
              }
            
                viewCard(data);
              
            })
            .catch(error => {
              console.error('Error:', error);
            });
            
            // method to show the maximum of six pets in a page 
            function viewCard(pets) {
                const totalPages = Math.ceil(pets.length / 6); // Calculate the total number of pages
                const prevPage = (index - 1 < 0) ? (totalPages - 1) : (index - 1); // Determine the previous page based on the current index
                const nextPage = (parseInt(index) + 1 >= totalPages) ? 0 : (parseInt(index) + 1); // Determine the next page based on the current index

                
                
                buttons.innerHTML += `
                  <a href="index.html?page=${prevPage}" role="button" class="btn btn-outline-dark">Previous</a>
                  <a href="index.html?page=${nextPage}" role="button" class="btn btn-outline-dark">Next</a>
                  
                `

                for(let i =1;i<=totalPages;i++){
                buttonsPages.innerHTML += `
                  <a href="index.html?page=${i-1}" role="button" class="btn btn-outline-dark">${i}</a>
                `}
                
  
                const startIndex = index * 6; // Calculate the starting index for the current page
                const endIndex = startIndex + 6; // Calculate the ending index for the current page
                for (let i = startIndex; i < endIndex && i < pets.length; i++) {
                  const pet = pets[i]; // Get the current pet object
                  petlist.innerHTML += `
                    <div class="col">
                      <div class="card shadow-sm">
                        <img src="${pet.pic1}" height="300" alt="${pet.name}">
                        <div class="card-body">
                          <p class="card-text nameDog">${pet.name}</p>
                          <p class="card-text">${pet.gender}</p>
                          <p class="card-text">${pet.age}</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                              <a href="detail.html?pet=${i + 1}" class="btn btn-sm btn-outline-secondary">View</a>
                            </div>
                            <small class="text-muted">${pet.breed}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                }
              }