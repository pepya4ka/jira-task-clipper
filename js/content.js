document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyC') {
            if (!window.getSelection() || window.getSelection().toString().length === 0) {

                const taskNumber = getTaskNumber()
                const taskTitle = getTaskTitle()

                const res = `${taskNumber} ${taskTitle}`

                navigator.clipboard.writeText(res)
                    .then(function () {
                        console.log(`Task information successfully copied to clipboard with text: ${res}`)
                    })
                    .catch(function (err) {
                        console.error('Error copying task information: ', err)
                    })
            }
        }
    }
)

function getTaskNumber() {
    const taskNumberFromQuerySelector = () => document.querySelector('#key-val')?.innerText
    const taskNumberFromPath = () => {
        const regex = /\/browse\/([A-Z]+-\d+)/
        return window.location.href.match(regex)?.[1]
    }
    const taskNumberFromQueryParams = () => new URL(window.location.href).searchParams.get('selectedIssue')

    const taskNumbers = [taskNumberFromQuerySelector, taskNumberFromPath, taskNumberFromQueryParams]
        .map(fn => fn())
        .map(taskNumber => taskNumber?.trim())
    return taskNumbers.find(taskNumber => taskNumber !== '')
}

function getTaskTitle() {
    const taskTitleFromQuerySelector = () => document.querySelector('#summary-val')?.innerText
    const taskTitleFromH1Tag = () => document.getElementsByTagName('h1')?.[0].innerText

    const taskTitles = [taskTitleFromQuerySelector, taskTitleFromH1Tag]
        .map(fn => fn())
        .map(taskTitle => taskTitle?.trim())
    return taskTitles.find(taskTitle => taskTitle !== '')
}
