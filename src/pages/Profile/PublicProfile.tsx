import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameShell from "../../components/GameShell";

type PublicProfileData = {
  username: string;
  totalXP: number;
  level: number;
  rank: number;
  mostPlayedGame: string | null;
};

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/profile/${username}`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, [username]);

  if (!profile) return <GameShell title="Profile">Loading...</GameShell>;

  return (
    <GameShell title={`${profile.username}'s Profile`}>
      <div className="profile-card">
        <p><strong>Level:</strong> {profile.level}</p>
        <p><strong>Total XP:</strong> {profile.totalXP}</p>
        <p><strong>Global Rank:</strong> #{profile.rank}</p>
        <p><strong>Most Played Game:</strong> {profile.mostPlayedGame ?? "N/A"}</p>
      </div>
    </GameShell>
  );
}