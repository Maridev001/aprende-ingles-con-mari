// Sidebar toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarNav = document.getElementById('sidebar-nav');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebarNav.classList.toggle('open');
    });
}

// Sidebar link click: highlight active and close sidebar on mobile
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        sidebarNav.classList.remove('open');
    });
});

// Quiz logic per topic
document.querySelectorAll('.quiz-topic').forEach(topic => {
    const questions = topic.querySelectorAll('.quiz-question');
    const resultBox = topic.querySelector('.quiz-result');
    const scoreEl = resultBox ? resultBox.querySelector('.score') : null;
    const messageEl = resultBox ? resultBox.querySelector('.score-message') : null;
    const restartBtn = resultBox ? resultBox.querySelector('.btn-restart') : null;
    let answered = 0;
    let correct = 0;
    const total = questions.length;

    questions.forEach(question => {
        const correctAnswer = question.dataset.correct;
        const options = question.querySelectorAll('.quiz-option');

        options.forEach(option => {
            option.addEventListener('click', () => {
                if (question.classList.contains('answered')) return;

                question.classList.add('answered');
                answered++;

                options.forEach(opt => opt.classList.add('disabled'));

                if (option.dataset.value === correctAnswer) {
                    option.classList.add('correct');
                    correct++;
                } else {
                    option.classList.add('incorrect');
                    options.forEach(opt => {
                        if (opt.dataset.value === correctAnswer) {
                            opt.classList.add('correct');
                        }
                    });
                }

                if (answered === total) {
                    showResult();
                }
            });
        });
    });

    function showResult() {
        if (!resultBox) return;
        resultBox.style.display = 'block';
        scoreEl.textContent = correct + '/' + total;

        const percentage = (correct / total) * 100;
        if (percentage === 100) {
            messageEl.textContent = 'Excellent! Perfect score!';
        } else if (percentage >= 70) {
            messageEl.textContent = 'Great job! Keep practicing!';
        } else if (percentage >= 50) {
            messageEl.textContent = 'Good try! Review the lesson and try again.';
        } else {
            messageEl.textContent = "Don't worry! Practice makes perfect!";
        }

        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            answered = 0;
            correct = 0;
            resultBox.style.display = 'none';

            questions.forEach(question => {
                question.classList.remove('answered');
                question.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('correct', 'incorrect', 'disabled');
                });
            });

            topic.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

// Highlight sidebar link on scroll
const topicSections = document.querySelectorAll('.quiz-topic');
if (topicSections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        topicSections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.dataset.topic;
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.topic === current) {
                link.classList.add('active');
            }
        });
    });
}
