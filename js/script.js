const carSelect = document.getElementById('cars')
const resultBody = document.querySelector('.result__body');
const spanName = document.querySelector('.name__result')
const spanPrice = document.querySelector('.price__result')
let fetchData;
let filterArr = []
let cars = []

const getData = async () => {
  const response = await fetch('./cars.json');
  const data = await response.json();
  fetchData = data;
  return data;
}

(async () => {
  await getData();

	const getAllOptions = () => {
		carSelect.innerHTML = `<option selected>Выберите автомобиль</option>`;
		
		fetchData.cars.forEach(e => {
			cars.push(e.brand)
		})
		
		cars = cars.filter((item, index) => {
			return cars.indexOf(item) === index
	 });
	 cars.sort()
	 cars.forEach(e => {
		carSelect.insertAdjacentHTML('beforeend', `<option value="${e}">${e}</option>`)
	 })
	}
	const filterBrands = () =>{
		filterArr = []
		resultBody.innerHTML = ''
		if(carSelect.selectedIndex == 0){
			drawInfo()
		} else {
			fetchData.cars.forEach(e => {
				if(e.brand === carSelect[carSelect.selectedIndex].value){
							filterArr.push(e)
				}
			})
			drawInfo(filterArr[0])
		}
	}
	const drawInfo = (arr) => {
		let nameBlock;
		let priceBlock;

		resultBody.insertAdjacentHTML('beforeend', 
		 `<div class="name">
		 <span>Автомобиль: </span>
	 </div>
	 <div class="price">
		 <span>Цена: </span>
	 </div>`
		)
		if(arr){
			nameBlock = document.querySelector('.name')
			priceBlock = document.querySelector('.price')
			nameBlock.insertAdjacentHTML('beforeend', `<span class="name__result">$${arr.brand}</span>`)
			priceBlock.insertAdjacentHTML('beforeend', `<span class="price__result">$${arr.price}</span>`)
		}
	}
	getAllOptions()
	carSelect.addEventListener('change', e => 	filterBrands());
})();