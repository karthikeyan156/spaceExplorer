export async function subscribe(req, res) {
    try {
      const email=req.body.email;
      res.status(200).json({
        message: "Successfully added", 
      });
    } catch (err) {
      console.log("Error fetching APOD data:", err);
      res.status(500).json({ message: "An error occurred, please try again later." });
    }
  }
  