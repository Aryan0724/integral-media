// Multi-Step Form Logic

let currentStep = 1;
const totalSteps = 3;
let formData = {
    companyName: "",
    services: [],
    email: "",
    phone: ""
};

// Open/Close Modal
function openForm() {
    const overlay = document.querySelector('.form-modal-overlay');
    overlay.classList.add('active');
    // Reset form on open
    currentStep = 1;
    updateStepVisibility();
}

function closeForm() {
    const overlay = document.querySelector('.form-modal-overlay');
    overlay.classList.remove('active');
}

// Navigation
function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepVisibility();
        } else {
            submitForm();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepVisibility();
    }
}

function updateStepVisibility() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    document.querySelector(`#step-${currentStep}`).classList.add('active');

    // Update Dynamic Text
    if (currentStep === 2) {
        document.getElementById('name-placeholder').textContent = formData.companyName || "there";
        document.getElementById('name-placeholder-2').textContent = formData.companyName || "there";
    }

    // Update Buttons
    const backBtn = document.querySelector('.back-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (currentStep === 1) {
        backBtn.style.visibility = 'hidden';
    } else {
        backBtn.style.visibility = 'visible';
    }

    if (currentStep === totalSteps) {
        nextBtn.textContent = "Finish & Send";
    } else {
        nextBtn.textContent = "Next →";
    }
}

// Input Handling
function updateFormData(field, value) {
    formData[field] = value;
}

function toggleService(element, serviceName) {
    element.classList.toggle('selected');

    if (formData.services.includes(serviceName)) {
        formData.services = formData.services.filter(s => s !== serviceName);
    } else {
        formData.services.push(serviceName);
    }
}

// Validation
function validateStep(step) {
    if (step === 1) {
        const name = document.getElementById('company-input').value;
        if (!name.trim()) {
            shakeInput('company-input');
            return false;
        }
        updateFormData('companyName', name);
    }

    if (step === 2) {
        if (formData.services.length === 0) {
            alert("Please select at least one service.");
            return false;
        }
    }

    if (step === 3) {
        const email = document.getElementById('email-input').value;
        if (!email.trim() || !email.includes('@')) {
            shakeInput('email-input');
            return false;
        }
        updateFormData('email', email);
        updateFormData('phone', document.getElementById('phone-input').value);
    }

    return true;
}

function shakeInput(id) {
    const el = document.getElementById(id);
    el.style.borderColor = '#ff4d4d';
    el.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
    ], { duration: 300 });

    setTimeout(() => {
        el.style.borderColor = '#333';
    }, 2000);
}

// Final Submission
// Initialize Supabase (Hardcoded for static site usage)
const SUPABASE_URL = 'https://kboidwzedoztfaxvptlo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtib2lkd3plZG96dGZheHZwdGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2ODg4MzIsImV4cCI6MjA4NTI2NDgzMn0.ez_nc1BIoyO548JvmfdAUsaOn4fVTW9CCP6zqhtdnqg';

async function submitForm() {
    // Show loading state
    const nextBtn = document.querySelector('.next-btn');
    const originalText = nextBtn.textContent;
    nextBtn.textContent = "Sending...";
    nextBtn.disabled = true;

    // Initialize Client
    let supabase;
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("Supabase not loaded");
        alert("System error: Could not connect to database.");
        nextBtn.textContent = originalText;
        nextBtn.disabled = false;
        return;
    }

    try {
        console.log("Submitting lead to Supabase...", formData);

        const { data, error } = await supabase
            .from('leads')
            .insert({
                name: formData.companyName,
                email: formData.email,
                phone: formData.phone,
                services_interested: formData.services,
                status: 'new'
            });

        if (error) throw error;

        console.log('Success!', data);
        alert("Thanks! We've received your request and will get back to you shortly.");
        closeForm();

        // Reset state
        nextBtn.textContent = originalText;
        nextBtn.disabled = false;
        formData = { companyName: "", services: [], email: "", phone: "" };
        currentStep = 1;

    } catch (error) {
        console.error('Error!', error.message);
        alert("Something went wrong. Please try again later.");
        nextBtn.textContent = originalText;
        nextBtn.disabled = false;
    }
}

// Event Listeners for Overlay
document.querySelector('.form-modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.form-modal-overlay')) {
        closeForm();
    }
});

// Inline Contact Form Handler (Footer)
async function submitContactForm(e) {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const btn = e.target.querySelector('button');
    const feedback = document.getElementById('contact-feedback');

    if (!nameInput.value || !emailInput.value) return;

    const originalText = btn.textContent;
    btn.textContent = "SENDING...";
    btn.disabled = true;

    // Initialize Client (Reuse if available or create)
    let supabase;
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("Supabase not loaded");
        btn.textContent = "ERROR";
        btn.disabled = false;
        return;
    }

    try {
        const { error } = await supabase
            .from('leads')
            .insert({
                name: nameInput.value,
                email: emailInput.value,
                // Now including the message field
                message: messageInput.value,
                services_interested: ["General Inquiry"],
                status: 'new'
            });

        if (error) throw error;

        // Success
        feedback.style.display = 'block';
        btn.textContent = "SENT";
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            feedback.style.display = 'none';
        }, 3000);

    } catch (err) {
        console.error('Error submitting contact form:', err);
        btn.textContent = "TRY AGAIN";
        btn.disabled = false;
    }
}
