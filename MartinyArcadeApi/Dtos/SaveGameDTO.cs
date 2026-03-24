public class SaveGameDTO
{
    public int Version { get; set; }
    public object Player { get; set; } = new();
    public object Inventory { get; set; } = new();
    public object Equipment { get; set; } = new();
    public object Quests { get; set; } = new();
    public object Location { get; set; } = new();
}