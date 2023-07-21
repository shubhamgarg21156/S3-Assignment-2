const fetchUsers = async () => {
    try{
        const res = await fetch('/admin/all');
        if(!res.ok){
            console.error("Error fetching data");
            return;
        }

        const data = await res.json();
        
        const userList = document.querySelector('#users-list');
        
        data.forEach((user) => {
            const newLi = document.createElement("li");

            newLi.textContent = user.username;

            if(user.role !== "admin")
                userList.appendChild(newLi);
        })
    }catch(error){
        console.error("Error fetching data",error);
    }
}
fetchUsers();