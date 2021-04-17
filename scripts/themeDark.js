/* thema Dark ============================================================== */
const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")


const getStyle = (element, style) => 
    window.getComputedStyle(element).getPropertyValue(style)



const initialColors = {
    bg: getStyle(html, "--bg"),
    bgHeader: getStyle(html, "--bg-header"),
    bgCardtable: getStyle(html, "--bg-cardtable"),
    textTable: getStyle(html, "--text-table"),
    darkBlue: getStyle(html, "--dark-blue")
}



const darkMode = {
    bg: "#1D1D1D",
    bgHeader: "#000000",
    bgCardTable: "#111111",
    textTable: "#f0f2f5",
    darkBlue: "#ffffff"
}



const transformKey = Key => 
    "--" + Key.replace(/([A-Z])/, "-$1").toLowerCase()



const changeColors = (colors) => {
    Object.keys(colors).map(Key =>
        html.style.setProperty(transformKey(Key), colors[Key])
    )
}



checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})


/* localStorage ===================================================== */
const isExistLocalStorage = (key) => 
  localStorage.getItem(key) != null


const createOrEditLocalStorage = (key, value) => 
  localStorage.setItem(key, JSON.stringify(value))


const getValeuLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key))


checkbox.addEventListener("change", ({target}) => {
  if (target.checked) {
    changeColors(darkMode) 
    createOrEditLocalStorage('modo','darkMode')
  } else {
    changeColors(initialColors)
    createOrEditLocalStorage('modo','initialColors')
  }
})


if(!isExistLocalStorage('modo'))
  createOrEditLocalStorage('modo', 'initialColors')


if (getValeuLocalStorage('modo') === "initialColors") {
  checkbox.removeAttribute('checked')
  changeColors(initialColors);
} else {
  checkbox.setAttribute('checked', "")
  changeColors(darkMode);
}