document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'с')) {
        const taskNumber = document.querySelector('#key-val').innerText;
        const taskTitle = document.querySelector('#summary-val').innerText

        const res = `${taskNumber} ${taskTitle}`

        navigator.clipboard.writeText(res)
            .then(function () {
                console.log(`Task information successfully copied to clipboard with text: ${res}`)
            })
            .catch(function (err) {
                console.error('Error copying task information: ', err)
            })
    }
})