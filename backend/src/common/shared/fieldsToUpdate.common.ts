// Code adapted from effectivetypescript.com article tutorial: Know How to Iterate Over Objects
// https://effectivetypescript.com/2020/05/26/iterate-objects/

const FieldsToUpdate = (fieldsToUpdate) => {
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (!value) {
            delete fieldsToUpdate[key]
        }
    }
    return fieldsToUpdate
}

export default FieldsToUpdate
