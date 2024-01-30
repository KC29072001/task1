const createContactHandle = async (req, res, url, headers) => {
  try {
    const { first_name, last_name, email, mobile_number, data_store } =
      req.body;

    if (data_store !== "CRM") {
      throw new Error(
        "Invalid or missing parameters. Expected 'data_store=CRM'"
      );
    }

    const data = {
      contact: {
        first_name,
        last_name,
        email,
        mobile_number,
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const createdContact = await response.json();
      res.status(201).json(createdContact);
    } else {
      // Get more information about the error
      const errorMessage = await response.text();
      throw new Error(`Failed to create contact. Server response: ${errorMessage}`);
    }
  } catch (error) {
    res.status(429).json({ error: error.message });
  }
};

module.exports = {
  createContactHandle: createContactHandle,
};


//curl -H "Authorization: Token token=sfg999666t673t7t82" 
//-H "Content-Type: application/json" 
//-d '{"contact":{"first_name":"James", "last_name":"Sampleton (sample)",
// "mobile_number":"1-926-555-9503"}}' -X POST "https://domain.freshsales.io/api/contacts"