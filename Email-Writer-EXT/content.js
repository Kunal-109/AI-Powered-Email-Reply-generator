console.log("Email Writer")

function getEmailContent(){
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
    }
    return ''; }

function findComposeToolbar(){
    const selectors = ['.btC','.aDh','[role="toolbar"]','.gU.Up']
    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        }
    }
    return null; 
}

function createAIButton(){
    const button = document.createElement('div');
    button.className="T-I J-J5-Ji aoO v7 T-I-atl L3";
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generate AI Reply');
    return button;
}

function createToneDropdown(){
    const dropdown = document.createElement('select');
    dropdown.className = 'ai-tone-dropdown';
    dropdown.style.padding = '6px 10px';
    dropdown.style.marginRight = '8px';
    dropdown.style.borderRadius = '4px';
    dropdown.style.backgroundColor = '#fff';
    dropdown.style.cursor = 'pointer';
    dropdown.style.fontSize = '13px';
    dropdown.style.fontFamily = 'Google Sans, Roboto, Arial, sans-serif';
    dropdown.style.color = '#3c4043';
    
    const tones = ['Professional', 'Friendly', 'Casual', 'None'];
    tones.forEach(tone => {
        const option = document.createElement('option');
        option.value = tone;
        option.textContent = tone;
        dropdown.appendChild(option);
    });
    
    return dropdown;
}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    const existingDropdown = document.querySelector('.ai-tone-dropdown');
    const existingContainer = document.querySelector('.ai-reply-container');
    
    if(existingButton){
        existingButton.remove();
    }
    if(existingDropdown){
        existingDropdown.remove();
    }
    if(existingContainer){
        existingContainer.remove();
    }
    
    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not Found");
        return;
    }
    console.log("Toolbar found");
    
    // Create container
    const container = document.createElement('div');
    container.className = 'ai-reply-container';
    container.style.display = 'inline-flex';
    container.style.alignItems = 'center';
    container.style.marginRight = '8px';
    
    // Create dropdown and button
    const dropdown = createToneDropdown();
    const button = createAIButton();
    button.classList.add('ai-reply-button'); // Fixed: removed the dot

    button.addEventListener('click', async ()=>{
        try {
            // Store original content
            const originalContent = button.innerHTML;
            
            // Disable button and show loading state
            button.innerHTML = 'Generating...';
            button.style.pointerEvents = 'none';
            button.style.opacity = '0.6';
            dropdown.disabled = true;
            
            const emailContent = getEmailContent();
            const selectedTone = dropdown.value;
            
            const response = await fetch('http://localhost:8080/api/email/generate',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: selectedTone
                })
            });

            if(!response.ok){
                throw new Error(`API Request Failed: ${response.status} ${response.statusText}`);
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
                console.log('Reply inserted successfully');
            } else {
                console.error('Compose box not found');
                throw new Error('Could not find compose box');
            }
            
            // Reset button state on success
            button.innerHTML = originalContent;
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
            dropdown.disabled = false;
            
        } catch (error) {
            console.error('Error generating reply:', error);
            
            // Reset button state on error
            button.innerHTML = 'AI Reply';
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
            dropdown.disabled = false;
            
            // Show error to user
            alert(`Failed to generate reply: ${error.message}`);
        }
    });
    
    // Add dropdown and button to container
    container.appendChild(dropdown);
    container.appendChild(button);

    // Insert container into toolbar
    toolbar.insertBefore(container, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]')
            || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if(hasComposeElements){
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});