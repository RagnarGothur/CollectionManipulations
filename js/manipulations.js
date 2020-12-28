//Выводит массив на консоль
function PrintArray(array) {
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        console.log(`ID: ${obj.id} | Имя: ${obj.name} | Тип: ${obj.type}`)
    }
}

//Сортирует массив по ID (и выводит результат)
function SortByID(array, reverse = false, printResult = true) {
    const sorted = array.sort(
        (obj1, obj2) => reverse ?
            -1 * CompareTo(obj1.id, obj2.id) :
            CompareTo(obj1.id, obj2.id)
    );

    if (printResult) {
        console.log("\nSortByID:");
        PrintArray(sorted);
    }

    return sorted;
}

//Сортирует массив по type и по ID в противоположных порядках (и выводит результат)
function SortByType(array, reverse = false, printResult = true) {
    const sorted = array.sort((obj1, obj2) => {
        let compared = reverse ?
            -1 * CompareTo(obj1.type, obj2.type) :
            CompareTo(obj1.type, obj2.type);

        return compared === 0 ?
            (reverse ?
                CompareTo(obj1.id, obj2.id) :
                -1 * CompareTo(obj1.id, obj2.id)
            ) :
            compared;
    });

    if (printResult) {
        console.log("\nSortByType:");
        PrintArray(sorted);
    }

    return sorted;
}

//Сравнивает 2 объекта между собой стандартными операторами сравнения (>, <)
function CompareTo(obj1, obj2) {
    if (obj1 < obj2) {
        return -1;
    } else if (obj1 > obj2) {
        return 1;
    } else {
        return 0;
    }
}

//Фильтрует коллекцию по типу (захардкодил тип 2 как дефолтный случай)
function FilterByType(array, type = 2, printResult = true) {
    let filtered = array.filter(item => item.type === type);

    if (printResult) {
        console.log("\nFilterByType:");
        PrintArray(filtered);
    }
}

//Фильтрует коллекцию, удаляя элементы с незаполненным именем
function FilterByFilledName(array, printResult = true) {
    let filtered = array.filter(item => item.name != null && item.name != undefined);

    if (printResult) {
        console.log("\nFilterByFilledName:");
        PrintArray(filtered);
    }
}

//Генерирует пропущенные элементы и добавляет их в массив, затем сортирует по убыванию
function AddMissedElements(array, printResult = true) {
    const missedIDs = FindMissedElements(array);

    for (let i = 0; i < missedIDs.length; i++) {
        let missed = missedIDs[0];
        array.push({ id: missed, name: undefined, type: undefined });
    }

    const reverseSorted = SortByID(array, true, false);
    if (printResult) {
        console.log("\nAddMissedElements:");
        PrintArray(reverseSorted);
    }

    return reverseSorted;
}

//Ищет пропущенные элементы в массиве
function FindMissedElements(array) {
    let missedIDs = [];
    const sorted = SortByID(array, false, false);

    let previous = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
        let current = sorted[i];

        //Разрыв
        for (let missed = previous.id + 1; missed < current.id; missed++) {
            missedIDs.push(missed)
        }

        previous = current;
    }

    return missedIDs;
}

//Делает срез
function Slice(array, start = 3, end = 5, printResult = true) {
    let sliced = array.slice(3, 5);

    if (printResult) {
        console.log("\nSlice:");
        PrintArray(sliced);
    }
}
