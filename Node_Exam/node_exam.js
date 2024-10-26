const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inventory=new Map();
function askCommand(){
    console.log("Welcome to Book Inventory System!");
    console.log("Available commands: ADD, REMOVE, SEARCH, UPDATE, SUMMARY, EXIT");
    rl.question("Enter a command:",function(command){

        switch(command.trim().toUpperCase()){
            case 'ADD':
                addBookPrompt();
                break;
            case 'REMOVE':
                removeBookPrompt();
                break;
            case 'UPDATE':
                updateBookPrompt();
                break;
            case 'SEARCH':
                searchBookPrompt();
                break;
            case 'SUMMARY':
                printSummary();
                break;
            case 'EXIT':
                rl.close();
                break;
            default:
                console.log("Please Enter a valid command.");
                askCommand();
                break;
        }
    })
};

function addBookPrompt(){
    rl.question("Enter Book ID:",function(id){
        rl.question("Enter Book Title:",function(title){
            rl.question("Enter Author Name:",function(author){
                rl.question("Enter Book's Genre:",function(genre){
                    addBook(id,title,author,genre);
                    askCommand();
                })
            })
        })
    })
};

function addBook(id,title,author,genre){
    if(inventory.has(id)){
        console.log(`Book with ID ${id} already exists`);
    }else{
        inventory.set(id,{title,author,genre});
        console.log(`Book with ID ${id} added to inventory!`);
    }
    
};

function removeBookPrompt(){
    rl.question("Enter Book ID to remove:",function(id){
        removeBook(id);
        askCommand();
    })
};

function removeBook(id){
    if(inventory.has(id)){
        inventory.delete(id);
        console.log(`Book with ID ${id} removed!`);
    }else{
        console.log(`Error: No Book with ID ${id} found!`);
    }
};

function updateBookPrompt(){
    rl.question("Enter Book ID:",function(id){
        rl.question("Enter Book Title:",function(newTitle){
            rl.question("Enter Book's Author:",function(newAuthor){
                rl.question("Enter Genre:",function(newGenre){
                    updateBook(id,newTitle,newAuthor,newGenre);
                    askCommand();
                });
            });
        });
    });
};

function updateBook(id,newTitle,newAuthor,newGenre){
    if(inventory.has(id)){
        const item=inventory.get(id);
        item.title=newTitle||item.title;
        item.author=newAuthor||item.author;
        item.genre=newGenre||item.genre;
        inventory.set(id,item);
        console.log(`Book with ID ${id} updated`);
    }else{
        console.log(`Error: Book with ID ${id} not found!`);
    }
};

function searchBookPrompt(){
    rl.question("Enter search term:",function(searchTerm){
        searchBooks(searchTerm);
        askCommand();
    })
};

function searchBooks(searchTerm){
    const books =[];
    for(const[id,item]of inventory){
        if(id.includes(searchTerm)||item.title.includes(searchTerm)||item.author.includes(searchTerm)||item.genre.includes(searchTerm)){
            books.push({id,...item});
        }
        
    }
    if(books.length>0){
        console.log('Search Results:',books);
    }else{
        console.log('Error: No Books found!')
    }
};

function printSummary(){
    if(inventory.size>0){
        console.log('Inventory Summary:');
        for(const[id,item] of inventory){
            console.log(`Book ID: ${id}, Book Title: ${item.title}, Author's Name: ${item.author}, Book Genre: ${item.genre}`);
        }
    }else{
        console.log('Error: No Book found!');
    }
    askCommand();
};

askCommand();