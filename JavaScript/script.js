// ===== STATS TICKER - GOOGLE SHEETS =====
const tickerTrack = document.getElementById('tickerTrack');

// Replace with your published Google Sheets CSV URL
const SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv';

async function loadTickerStats() {
    try {
        const response = await fetch(SHEETS_URL);
        const csvText = await response.text();
        
        // Parse CSV
        const rows = csvText.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',');
        const players = [];
        
        for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(',');
            const player = {};
            headers.forEach((header, index) => {
                player[header.trim()] = values[index]?.trim() || '';
            });
            players.push(player);
        }
        
        // Build ticker items
        let html = '';
        players.forEach(player => {
            // Only show active players (if you have an "Active" column)
            if (player.Active && player.Active.toLowerCase() !== 'false') {
                html += `
                    <span class="ticker-item">
                        <span class="player-name">${player.Name}</span>
                        <span class="player-team">${player.Team}</span>
                        <span class="player-stats">${player.Stats}</span>
                    </span>
                `;
            }
        });
        
        // Duplicate for seamless scrolling
        tickerTrack.innerHTML = html + html;
        
    } catch (error) {
        console.error('Failed to load stats:', error);
        tickerTrack.innerHTML = `
            <span class="ticker-item">Loading stats...</span>
        `;
    }
}

loadTickerStats();
