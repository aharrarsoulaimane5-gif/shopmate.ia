// Chat Widget JavaScript
class ChatWidget {
    constructor() {
        this.chatButton = document.getElementById('chat-button');
        this.chatWindow = document.getElementById('chat-window');
        this.closeButton = document.getElementById('close-chat');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-button');
        
        // Conversation history for API
        this.conversationHistory = [];
        
        // Initialize event listeners
        this.init();
    }

    init() {
        // Toggle chat window
        this.chatButton.addEventListener('click', () => this.openChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key (Shift+Enter for new line)
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.chatInput.addEventListener('input', () => this.autoResizeTextarea());
    }

    openChat() {
        this.chatWindow.classList.remove('hidden');
        this.chatInput.focus();
    }

    closeChat() {
        this.chatWindow.classList.add('hidden');
    }

    autoResizeTextarea() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = this.chatInput.scrollHeight + 'px';
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        
        if (!message) return;

        // Disable input while processing
        this.setInputState(false);

        // Add user message to UI
        this.addMessage(message, 'user');

        // Clear input
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';

        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: message
        });

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Call API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: this.conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error('Erreur réseau');
            }

            const data = await response.json();

            // Remove typing indicator
            this.removeTypingIndicator();

            // Add assistant response to conversation history
            this.conversationHistory.push({
                role: 'assistant',
                content: data.message
            });

            // Add bot message to UI
            this.addMessage(data.message, 'bot');

        } catch (error) {
            console.error('Error:', error);
            this.removeTypingIndicator();
            this.addMessage('Désolé, une erreur est survenue. Veuillez réessayer.', 'bot');
        } finally {
            // Re-enable input
            this.setInputState(true);
            this.chatInput.focus();
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.id = 'typing-indicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const indicator = document.createElement('div');
        indicator.className = 'message-content';
        
        const typingDots = document.createElement('div');
        typingDots.className = 'typing-indicator';
        typingDots.innerHTML = '<span></span><span></span><span></span>';
        
        indicator.appendChild(typingDots);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);

        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    setInputState(enabled) {
        this.chatInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});
