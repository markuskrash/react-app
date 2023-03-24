// import axios from "axios";
//
// class Persons {
//     static async get(setPersons, personId, setEmail) {
//
//
//         try {
//             const persons = await axios.get('http://127.0.0.1:8000/api/persons/')
//             const person = []
//             for (let i = 0; i < persons.data.length; i++) {
//                     setEmail(persons.data[i]["email"])
//             }
//             setPersons(person)
//             // localStorage.setItem('error', '')
//
//             // return 0;
//
//         } catch (event) {
//             // setValidated(false)
//             // event.stopPropagation()
//             //
//             localStorage.setItem('error', event.message)
//         }
//     }
// }
//
// export default Persons