function toggleMenu() {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    toggle.classList.toggle("active");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}

let body = document.getElementById("admin-sidebar")
while (body.firstChild) {
    body.removeChild(body.firstChild);
}
const adminSideBar = `<div class="navigation">
    <ul>
        <li class="admin-menu-top"></li>
        <li>
            <a href="/admin/dashboard">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/users-solid.png">
                </span>
                <span class="title">Users</span>
            </a>
        </li>
        <li>
            <a href="/admin/dashboard/careers">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/columns-solid.png">
                </span>
                <span class="title">Careers</span>
            </a>
        </li>
        <li>
            <a href="/admin/dashboard/clusters">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/layer-group-solid.png">
                </span>
                <span class="title">Clusters</span>
            </a>
        </li>
        <li>
            <a href="/admin/dashboard/industries">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/industry-solid.png">
                </span>
                <span class="title">Industries</span>
            </a>
        </li>
        <li>
            <a href="/admin/sys/report">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/poll-solid.png">
                </span>
                <span class="title">Career Matrix</span>
            </a>
        </li>
        <li>
            <a href="/admin/dashboard/schools">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/school-solid.png">
                </span>
                <span class="title">Schools Requests</span>
            </a>
        </li>
        <li>
            <a href="/admin/sys/report">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/server-solid.png">
                </span>
                <span class="title">System Report</span>
            </a>
        </li>
        <li>
            <a href="/admin/sys/report">
                <span class="icon">
                    <img width="30px" height="30px" src="/public/icons/poll-solid.png">
                </span>
                <span class="title">School Performance</span>
            </a>
        </li>

    </ul>
</div>`;
body.insertAdjacentHTML("beforeend", adminSideBar)
