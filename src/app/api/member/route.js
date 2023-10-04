export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
  
      // 여기에서 데이터를 처리하고 원하는 작업 수행
  
      res.status(200).json({ success: true, data });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }