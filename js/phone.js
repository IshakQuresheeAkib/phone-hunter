const loadPhone = async (inputText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll) =>{
    const showAllContainer = document.getElementById('showAll-container');
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = '';
    // show all button displayed when its more then 12 phones
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    // display only first 12 items if not showAll
    if (!isShowAll) {
        phones = phones.slice(0,12); 
    } 
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList= `card bg-gray-100 shadow-md py-2 mx-auto`;
        phoneCard.innerHTML = `
        <figure class="mt-4 bg-white mx-6 rounded-xl py-4">
            <img src=${phone.image} alt="${phone["phone_name"]}" class="w-32" />
        </figure>
        <div class="card-body items-center text-center px-4 space-y-1">
            <h2 class="card-title font-bold">${phone["phone_name"]}</h2>
            <p>If a dog chews Iphone 7e Pro whose Iphone 7e Pro does he choose?</p>
            <h4 class="font-extrabold text-lg">$999</h4>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent btn-sm px-10 normal-case text-white">Show Details</button>
            </div>
        </div> 
        `;
        phoneContainer.appendChild(phoneCard);  
    });
    toggleLoading(false);
}

// show details buttons
const handleShowDetails =async (id) => {
    // load single phone data
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone); 
    const showDetails_modal_5 = document.getElementById('showDetails_modal_5');
    showDetails_modal_5.innerHTML = `
    <form method="dialog" class="modal-box md:card max-h-screen bg-gray-100 shadow-md mx-auto px-4">
        <figure class="mt-4 bg-white mx-6 rounded-xl py-4 h-56">
                <img src=${phone.image} alt="${phone["phone_name"]}" class="w-32 mx-auto" />
        </figure>
        <div class="p-3" id="modalBody">
            <h1 class="text-2xl text-blue-900 font-bold py-3">${phone.name}</h1> 
            <p class="text-sm pb-4">If a dog chews Iphone 7e Pro whose Iphone 7e Pro does he choose?</p>
            <p><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
            <p><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
            <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
            <p><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
            <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
            <p><span class="font-bold">Release Data:</span> ${phone.releaseDate}</p>
            <p><span class="font-bold">Brand:</span> ${phone.brand}</p>
            <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS || "No GPS"}</p>
        </div>
        <div class="modal-action justify-end">
            <button class="btn btn-accent btn-sm normal-case text-white">Close</button>
        </div>
    </form>  
    `; 
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    // show the modal
    showDetails_modal_5.showModal();
    
}

// handle search button
const searchHandle = (isShowAll) => {
    toggleLoading(true);
    const inputField = document.getElementById('inputField');
    const inputText = inputField.value;
    loadPhone(inputText,isShowAll);
}


const toggleLoading = (isLoading) =>{
    const loadingDots = document.getElementById('loading-dots');
    if (isLoading) {
        loadingDots.classList.remove('hidden');
    }else{
        loadingDots.classList.add('hidden');
    }
}


// show all button
const handleShowAll = () => {
    searchHandle (true);

}