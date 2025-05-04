const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

app.post('/', async (req, res) => {
	const { input } = req.body;

	if (input?.startsWith('test')) {
		return res.json({ output: input });
	}

	try {
		const osobyUrl = 'https://letsplay.ag3nts.org/data/osoby.json?v=1743591162';
		const { data: osoby } = await axios.get(osobyUrl);

		// Możesz tu później filtrować osoby według inputu, np. badania
		const nazwiska = osoby.map(o => o.imie + ' ' + o.nazwisko).join(', ');

		res.json({ output: nazwiska });
	} catch (err) {
		res.status(500).json({ output: 'Błąd serwera: ' + err.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`tool1 running on port ${PORT}`));