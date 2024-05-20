const notificationBlock = document.createElement("div");
notificationBlock.id = 'jtclipper-noti-block'
document.body.appendChild(notificationBlock);

document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyC') {
            if (!window.getSelection() || window.getSelection().toString().length === 0) {

                const taskNumber = getTaskNumber()
                const taskTitle = getTaskTitle()

                const res = [taskNumber, taskTitle].join(' ')
                if (res.trim() !== '') {
                    navigator.clipboard.writeText(res)
                    .then(function () {
                        console.log(`Task information successfully copied to clipboard with text: ${res}`);
                        notificationBlock.textContent = `Copied to clipboard: ${res}`;
                        notificationBlock.style.display = 'block';

                        setTimeout(()=> {
                            notificationBlock.style.display = 'none';
                        }, 3000)
                    })
                    .catch(function (err) {
                        console.error('Error copying task information: ', err)
                    })
                }
            }
        }
    }
)

function getTaskNumber() {
    const taskNumberFromQuerySelector = document.querySelector('#key-val')?.innerText;

    const regex = /\/browse\/([A-Z]+-\d+)/;
    const taskNumberFromPath = window.location.href.match(regex)?.[1];

    const taskNumberFromQueryParams = new URL(window.location.href).searchParams.get('selectedIssue');

    return [taskNumberFromQuerySelector, taskNumberFromPath, taskNumberFromQueryParams]
        .map(taskNumber => taskNumber?.trim())
        .find(taskNumber => !!taskNumber)
}

function getTaskTitle() {
    const taskTitleFromQuerySelector = document.querySelector('#summary-val');
    const taskTitleFromDataAtr = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]');
    const taskTitleFromH1Tag = document.querySelector('h1');

    return [taskTitleFromQuerySelector, taskTitleFromDataAtr, taskTitleFromH1Tag]
        .map(taskTitle => taskTitle?.innerText?.trim())
        .find(taskTitle => !!taskTitle);
}
