using DastRas.Application.Interfaces;

namespace DastRas.Application.Services;

public class AddressValidationService : IAddressValidationService
{
    private static readonly string[] ValidStreets =
    [
        "рудаки", "сомони", "айни", "шотемур", "карабаев",
        "гафуров", "расулов", "мушфики", "борбад", "сахбо",
        "хисор", "шерози", "турсунзаде", "боктар", "бехзод",
        "дусти", "худжанди", "зебуниссо", "шевченко"
    ];

    public bool ValidateAddress(string addressDetails)
    {
        if (string.IsNullOrWhiteSpace(addressDetails))
            return false;

        var normalized = addressDetails.ToLower();
        return ValidStreets.Any(street => normalized.Contains(street));
    }
}
