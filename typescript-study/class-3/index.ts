// структура данных склада с одеждой

type ClothesWarehouse = {
  jackets: "empty" | number;
  hats: "empty" | number;
  socks: "empty" | number;
  pants: "empty" | number;
};

// структура данных склада с канцтоварами

type StationeryWarehouse = {
  scissors: "empty" | number;
  paper: "empty" | boolean;
};

// структура данных склада с бытовой техникой

type AppliancesWarehouse = {
  dishwashers: "empty" | number;
  cookers: "empty" | number;
  mixers: "empty" | number;
};

// общая структура данных, наследует все данные из трех выше
// + добавляет свои

type TotalWarehouse = {
  deficit: boolean;
  date: Date;
} & ClothesWarehouse &
  StationeryWarehouse &
  AppliancesWarehouse;

// главный объект со всеми данными, должен подходить под формат TotalWarehouse

const totalData: TotalWarehouse = {
  jackets: 5,
  hats: "empty",
  socks: "empty",
  pants: 15,
  scissors: 15,
  paper: true,
  dishwashers: 3,
  cookers: "empty",
  mixers: 14,
  deficit: true,
  date: new Date(),
};

// Реализуйте функцию, которая принимает в себя главный объект totalData нужного формата
// и возвращает всегда строку
// Функция должна отфильтровать данные из объекта и оставить только те названия товаров, у которых значение "empty"
// и поместить их в эту строку. Если таких товаров нет - возвращается другая строка (см ниже)

// С данным объектом totalData строка будет выглядеть:
// "We need this items: hats, socks, cookers"
// Товары через запятую, в конце её не должно быть. Пробел после двоеточия, в конце строки его нет.

function filterData(data: TotalWarehouse): string {
  let str: string = "";

  let transData = Object.entries(data);
  const filteredData: string[] = transData
    .filter((position) => position[1] === "empty")
    .map((item) => item[0]);

  if (filteredData.length === 0) {
    return "";
  }

  for (let index = 0; index < filteredData.length; index++) {
    str += `${filteredData[index]}, `;
  }

  return str.slice(0, str.length - 2)
}

function printReport(data: TotalWarehouse) {
	const emptyItems: string = filterData(data);
	if (emptyItems !== '') {
		return `We need this items: ${emptyItems}`;
	}
  return "Everything fine";
}

console.log(printReport(totalData));
