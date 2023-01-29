import path from 'path';
import fs from 'fs';

 // Access our data (AllEvents)
function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

// Extract our Data
function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
} 

export default function handler (req, res) {
    const { method } = req;

      // Access our data (AllEvents)
      // Extract our Data
        // res 404 if there are no AllEvents
      //AllEvents - loop through then and identify the eventId
        // add the email into emails_registered - write on our data
          // only if that email doesn't exist
          // check the format of the email is ok

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    if(!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found'
        });
    }
    
    if(method === 'POST') {
        const { email, eventId } = req.body;

        if(!email | !email.includes('@')) {
          res.status(422).json({ message: 'Invalid email address' });
        }
       
        const newAllEvents = allEvents.map((ev) => {
            if(ev.id === eventId) {
              if(ev.emails_registered.includes(email)) {
                res.status(409).json({message: 'This email has already been registered' });
                return ev;
              }  
              return {
                ...ev, 
                emails_registered: [...ev.emails_registered, email],
              };
            }
          return ev; 
        });

        // add the email into emails_registered - write on our data
        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

        res.status(201).json({
          message: `You have been registered successfully with the email: ${email} for the event: ${eventId} `,
        });
    }
}