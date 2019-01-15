let manager = {};

manager.domain = {};
manager.domain.Person = function (name, address) {
    this.name = name;
    this.address = address;
}

manager.domain.Person.prototype.toString = function () {
    return this.name + " (" + this.address + ")";
}


manager.gui = (function () {
    function update() {
        let personsElement = document.getElementById("persons");
        clear(personsElement);

        populate(personsElement);
    }

    function clear(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function populate(element) {
        let persons = manager.data.list();
        for (let i = 0; i < persons.length; i++) {
            addPersonToElement(element, persons[i]);
        }
    }

    function addPersonToElement(element, person) {
        let textElement = document.createElement("p");
        let textNode = document.createTextNode(person.toString());
        textElement.appendChild(textNode);

        element.appendChild(textElement);
    }

    function buttonPressed() {
        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        let newPerson = new manager.domain.Person(name, address);
        manager.data.add(newPerson);
    }

    return {
        buttonPressed: buttonPressed,
        update: update
    };
})();

manager.data = (function (updateHook) {
    let persons = new Array();

    function addPerson(person) {
        persons.push(person);
        updateHook();
    }

    function list() {
        return persons;
    }

    return {
        add: addPerson,
        list: list
    };

})(manager.gui.update);

function init() {
    let addPersonButton = document.getElementById("add-person");
    addPersonButton.addEventListener("click", manager.gui.buttonPressed, false);
}