

const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu))
    },
    getLocalStorage() {
        localStorage.getItem("menu")
    }
}

function App() {

    let menu = store.getLocalStorage() || [];

    const updateMenuCount = () => {
        const menuCount = $("#espresso-menu-list").querySelectorAll("li").length
        $(".menu-count").innerText = `총 ${menuCount} 개`
    }

    const addMenuName = () => {
        if ($("#espresso-menu-name").value === "") {
            alert("값을 입력해주세요.")
            return
        }

        const espressoMenuName = $("#espresso-menu-name").value;
        menu.push({ name: espressoMenuName })
        store.setLocalStorage(menu)
        const template = menu
            .map((item, index) => {
                return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${item.name}</span>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                  삭제
                </button>
              </li>`
            }).join("")


        $("#espresso-menu-list").innerHTML = template

        updateMenuCount()
        $("#espresso-menu-name").value = ""
    }

    const updateMenuName = (e) => {
        const menuId = e.target.closest("li").dataset.menuId
        const $menuName = e.target
            .closest("li")
            .querySelector(".menu-name")
        const updatedMenuName = prompt(
            "메뉴명을 수정하세요",
            $menuName.innerText
        )
        menu[menuId].name = updatedMenuName
        store.setLocalStorage(menu)
        $menuName.innerText = updatedMenuName
    }

    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const menuId = e.target.closest("li").dataset.menuId
            menu.splice(menuId, 1)
            store.setLocalStorage(menu)
            e.target.closest("li").remove()
            updateMenuCount()
        }
    }

    $("#espresso-menu-submit-button").addEventListener("click", () => {
        addMenuName();
    })

    $("#espresso-menu-name").addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName()
    });

    $("#espresso-menu-list").addEventListener("click", (e) => {

        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e)
        }

        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e)
        }
    })

    $("#espresso-menu-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });
}

App();