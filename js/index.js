let isActive = false;


const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPosts = data.posts
    //console.log(allPosts);
    displayAllPosts(allPosts)
}
const loadSearchPosts = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const allPost = data.posts;
    displayAllPosts(allPost)


}

const displayAllPosts = allPosts => {

    const postContainer = document.getElementById('div-container');
    // clear post container before adding new posts
    postContainer.textContent = '';
    allPosts.forEach(post => {
        console.log(post);

        const postCard = document.createElement('div');
        postCard.classList = `rounded-3xl bg-[#797DFC1A] p-3`;
        postCard.innerHTML = `<div>
        <div class="flex items-center lg:gap-8">
        <div>
        <div class="relative mt-5">
            <img class="rounded-full w-[100px] h-[100px]" src="${post.image}" />
            <div class="w-[20px] h-[20px] rounded-full absolute -top-0 left-20 ${post.isActive ? "bg-green-700" : "bg-red-700"}"></div>
        </div>
    </div>
            <div class="flex gap-3">
                <p class="text-[#12132DCC] text-sm font-medium font-inter">${post.category}</p>
                <p class="text-[#12132DCC] text-sm font-medium font-inter">${post.author.name}</p>
            </div>
        </div>
        <div class="space-y-5 ml-28">
            <p class="text-[#12132D] font-bold text-xl font-mulish">${post.title}</p>
            <p class="text-[#12132D99] font-inter text-base">${post.description}</p>
            <img src="images/Line 1 (3).png" alt="">
            <div class="flex justify-between">
                <div class="gap-5 flex justify-between ">
                    <div class="flex gap-3">
                        <img src="images/Group 13.png" alt="">
                        <p>${post.comment_count}</p>
                    </div>
                    <div class="flex gap-3">
                        <img src="images/Vector (1).png" alt="">
                        <p>${post.view_count}</p>
                    </div>
                    <div class="flex gap-3">
                        <img src="images/Vector (2).png" alt="">
                        <p>${post.posted_time}</p>
                    </div>
                </div>
                <div>
                    <img onclick="handleAccumulateData('${escape(post.title)}', '${post.view_count}')" src="images/Vector (3).png" alt="">
                </div>
            </div>
        </div>
    </div>
        `;
        postContainer.appendChild(postCard)
    })
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle accumulate data
const handleAccumulateData = (id, count) => {
    const accumulate = document.getElementById('accumulate');
    const accumulateText = accumulate.innerText;
    const parseAccumulate = parseInt(accumulateText);
    const parseAccumulate1 = parseAccumulate + 1;
    accumulate.innerText = parseAccumulate1;
    //console.log(parseAccumulate1);

    //console.log('clicked', id, count);
    const accumulateContainer = document.getElementById('accumulate-container');
    const countCard = document.createElement('div');
    countCard.innerHTML = `<div>
    <div id="accumulate-container" class="bg-[#12132D0D] rounded-3xl">
        <div class="p-5 space-y-5">
            
            <div class="bg-[#FFFFFF] rounded-2xl flex justify-between items-center gap-5 p-5">
                <p class="text-[#12132D] font-mulish font-semibold text-base">${unescape(id)}</p>
                <div class="flex gap-3">
                    <img src="images/Vector (1).png" alt="">
                    <p>${count}</p>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    accumulateContainer.appendChild(countCard)
}

// handle search button
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadSearchPosts(searchText);


}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// latest posts
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    //console.log(data);
    displayLatestPosts(data);
}

const displayLatestPosts = data => {
    const latestPostsContainer = document.getElementById('latest-div-container');

    data.forEach(data1 => {
        console.log(data1);
        const latestPost = document.createElement('div');
        latestPost.innerHTML = `<div class="card w-96 bg-base-100 space-y-4">
        <figure class="lg:px-10 pt-10">
            <img src="${data1.cover_image}" alt="Shoes"
                class="rounded-xl" />
        </figure>
        <div class="flex gap-2 ml-6 mr-6">
            <img src="images/Frame (7).png" alt="">
            <p class="text-[#12132D99] text-xl font-mulish">${data1.author?.posted_date || 'No Publish Date'}</p>
            
        </div>
        <p class="ml-6 mr-6 text-[#12132D] text-lg font-extrabold">${data1.title}</p>
        <p class="ml-6 mr-6 text-[#12132D99] text-xl font-mulish">${data1.description}</p>
        <div class="flex justify-between items-center ml-6 mr-6">
            <div class="avatar">
                <div class="w-24 rounded-full">
                    <img src="${data1.profile_image}" />
                </div>
            </div>
            <div>
                <p class="text-[#12132D] font-bold text-base">${data1.author.name}</p>
                <p class="text-[#12132D99] text-sm">${data1.author?.designation || 'Unknown'}</p>
            </div>
        </div>

    </div>
        `;
        latestPostsContainer.appendChild(latestPost);
    })
}



loadAllPosts();
loadLatestPosts();