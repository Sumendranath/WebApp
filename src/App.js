import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Register PWA service worker
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful:", registration);
      })
      .catch((error) => {
        console.error("ServiceWorker registration failed:", error);
      });
  });
}

export default function DailyTrackerApp() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    weight: "",
    waist: "",
    waterIntake: "",
    energyLevel: "",
    urineColor: "",
    supplements: "",
    notes: "",
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("dailyTrackerHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const updatedHistory = [...history, formData];
    setHistory(updatedHistory);
    localStorage.setItem("dailyTrackerHistory", JSON.stringify(updatedHistory));
    alert("Entry saved ✅");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📅 Daily Fitness Tracker</h1>
      <Card className="space-y-4 p-4">
        <CardContent className="space-y-3">
          <Input name="date" value={formData.date} onChange={handleChange} type="date" />
          <Input name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" />
          <Input name="waist" value={formData.waist} onChange={handleChange} placeholder="Waist (cm)" />
          <Input name="waterIntake" value={formData.waterIntake} onChange={handleChange} placeholder="Water Intake (L)" />
          <Input name="energyLevel" value={formData.energyLevel} onChange={handleChange} placeholder="Energy Level (1–10)" />
          <Input name="urineColor" value={formData.urineColor} onChange={handleChange} placeholder="Urine Color" />
          <Input name="supplements" value={formData.supplements} onChange={handleChange} placeholder="Supplements Taken" />
          <Input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
          <Button onClick={handleSubmit} className="w-full mt-4">Save Entry</Button>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📊 History</h2>
        {history.map((entry, idx) => (
          <Card key={idx} className="mb-2 p-2">
            <CardContent className="text-sm">
              <div><strong>Date:</strong> {entry.date}</div>
              <div><strong>Weight:</strong> {entry.weight} kg</div>
              <div><strong>Waist:</strong> {entry.waist} cm</div>
              <div><strong>Water:</strong> {entry.waterIntake} L</div>
              <div><strong>Energy:</strong> {entry.energyLevel}/10</div>
              <div><strong>Urine:</strong> {entry.urineColor}</div>
              <div><strong>Supplements:</strong> {entry.supplements}</div>
              <div><strong>Notes:</strong> {entry.notes}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
