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
    const taskNumberFromQuerySelector = document.querySelector('#key-val')?.innerText;

    const regex = /\/browse\/([A-Z]+-\d+)/;
    const match = window.location.href.match(regex);
    const taskNumberFromPath = match ? match[1] : null;

    const taskNumberFromQueryParams = new URL(window.location.href).searchParams.get('selectedIssue');

    const taskNumbers = [taskNumberFromQuerySelector, taskNumberFromPath, taskNumberFromQueryParams]
        .map(taskNumber => taskNumber?.trim())
        .filter(taskNumber => taskNumber);

    return taskNumbers[0] || null;
}

function getTaskTitle() {
    const taskTitleFromQuerySelector = document.querySelector('#summary-val');
    const taskTitleFromDataAtr = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');
    const taskTitleFromH1Tag = document.querySelector('h1');

    const taskTitles = [taskTitleFromQuerySelector, taskTitleFromDataAtr, taskTitleFromH1Tag]
        .map(taskTitle => taskTitle?.innerText?.trim())
        .filter(taskTitle => !!taskTitle);

    return taskTitles[0] || null;
}
