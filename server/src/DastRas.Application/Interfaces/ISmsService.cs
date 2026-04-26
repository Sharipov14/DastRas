namespace DastRas.Application.Interfaces;

public interface ISmsService
{
    Task<bool> SendSmsAsync(string phone, string code);
}
