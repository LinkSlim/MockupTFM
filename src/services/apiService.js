export const analyzeLesion = async (imageFile) => {
  // In a real scenario, you would use fetch or axios to call your AI endpoint
  // const formData = new FormData();
  // formData.append('image', imageFile);
  // const response = await fetch('/api/detect-lesion', { method: 'POST', body: formData });
  // return response.json();

  // Simulated Mock Response for testing the UI flow
  return new Promise((resolve) => {
    setTimeout(() => {
      // randomly pick a mocked result
      const mockResults = [
        { type: 'Nevus Melanocítico (Benigno)', confidence: 0.98, riskLevel: 'low' },
        { type: 'Carcinoma Basocelular', confidence: 0.89, riskLevel: 'medium' },
        { type: 'Melanoma Detectado', confidence: 0.94, riskLevel: 'high' },
        { type: 'Queratosis Seborreica (Benigno)', confidence: 0.96, riskLevel: 'low' }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      resolve(randomResult);
    }, 3500); // simulate network delay
  });
};
