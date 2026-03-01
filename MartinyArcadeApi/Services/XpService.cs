namespace MartinyArcadeApi.Services;

public class XpService
{
    public int CalculateLevel(int xp)
    {
        return (int)Math.Floor(Math.Sqrt(xp / 100.0)) + 1;
    }

    public (int level, int xpIntoLevel, int xpForNextLevel) GetProgress(int xp)
    {
        var level = CalculateLevel(xp);
        var nextLevelXP = (int)Math.Pow(level, 2) * 100;
        var prevLevelXP = (int)Math.Pow(level - 1, 2) * 100;

        return (
            level,
            xp - prevLevelXP,
            nextLevelXP - prevLevelXP
        );
    }


    public decimal GetLevelXpMultiplier(int level)
{
    // Smooth scaling
    // +2% per level

    return 1m + (level * 0.02m);
}
}