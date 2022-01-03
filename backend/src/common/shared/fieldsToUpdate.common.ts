const FieldsToUpdate = (fieldsToUpdate) => {
    for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (!value) {
            delete fieldsToUpdate[key]
        }
    }
    return fieldsToUpdate
}

export default FieldsToUpdate
