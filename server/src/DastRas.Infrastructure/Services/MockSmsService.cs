using DastRas.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace DastRas.Infrastructure.Services;

public class MockSmsService : ISmsService
{
    private readonly ILogger<MockSmsService> _logger;

    public MockSmsService(ILogger<MockSmsService> logger)
    {
        _logger = logger;
    }

    public Task<bool> SendSmsAsync(string phone, string code)
    {
        // In development, just log the code instead of sending a real SMS
        _logger.LogInformation("📱 SMS to {Phone}: Your verification code is {Code}", phone, code);
        return Task.FromResult(true);
    }
}
