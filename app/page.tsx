'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MapSelector from '@/components/map-selector';
import { Sun, Zap, TrendingDown, MapPin, CheckCircle2 } from 'lucide-react';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  factureElectricite: string;
  adresse: string;
  latitude: number | null;
  longitude: number | null;
}

export default function SolarLandingPage() {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    factureElectricite: '',
    adresse: '',
    latitude: null,
    longitude: null,
  });

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [addressSearched, setAddressSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleAddressSearch = async () => {
    if (!formData.adresse.trim()) {
      setError('Veuillez entrer une adresse');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Utilisation de l'API Nominatim pour le géocodage
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.adresse)}&limit=1&countrycodes=fr`
      );
      
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
        setFormData(prev => ({ ...prev, latitude: parseFloat(lat), longitude: parseFloat(lon) }));
        setAddressSearched(true);
      } else {
        setError('Adresse non trouvée. Veuillez vérifier et réessayer.');
      }
    } catch (err) {
      setError('Erreur lors de la recherche de l\'adresse. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validation
    if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.factureElectricite || !formData.adresse) {
      setError('Veuillez remplir tous les champs');
      setIsSubmitting(false);
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      setError('Veuillez sélectionner l\'emplacement de votre toiture sur la carte');
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparer les données pour le webhook n8n (GET avec query params)
      const webhookData = new URLSearchParams({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        facture_mensuelle_electricite: formData.factureElectricite,
        latitude: formData.latitude?.toString() || '',
        longitude: formData.longitude?.toString() || '',
        date_soumission: new Date().toISOString(),
      });

      const response = await fetch(`https://n8n.energum.earth/webhook/dfb660da-1480-40a5-bbdc-7579e6772fe1?${webhookData.toString()}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsSuccess(true);
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          factureElectricite: '',
          adresse: '',
          latitude: null,
          longitude: null,
        });
        setPosition(null);
        setAddressSearched(false);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Merci !</CardTitle>
            <CardDescription>
              Votre demande a été envoyée avec succès. Nous vous contacterons rapidement pour étudier votre projet solaire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsSuccess(false)} className="w-full">
              Faire une nouvelle demande
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sun className="w-12 h-12 text-orange-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Passez au Solaire
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Réduisez vos factures d'électricité jusqu'à 70% avec une installation photovoltaïque sur mesure
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Économies Immédiates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Produisez votre propre électricité et réduisez vos factures dès le premier jour
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingDown className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Rentable à long terme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Amortissement rapide et revenus garantis pendant 20 ans minimum
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Sun className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <CardTitle className="text-lg">Énergie Propre</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Contribuez à la transition énergétique et à la protection de l'environnement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Obtenez votre étude gratuite</CardTitle>
            <CardDescription>
              Remplissez le formulaire ci-dessous et recevez une estimation personnalisée sous 24h
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre@email.fr"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="factureElectricite">Facture mensuelle d'électricité (€) *</Label>
                <Input
                  id="factureElectricite"
                  name="factureElectricite"
                  type="number"
                  value={formData.factureElectricite}
                  onChange={handleInputChange}
                  placeholder="150"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse de votre toiture *</Label>
                <div className="flex gap-2">
                  <Input
                    id="adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    placeholder="12 Rue de la Paix, 75002 Paris"
                    className="flex-1"
                    required
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddressSearch}
                    disabled={isSearching || !formData.adresse.trim()}
                    variant="outline"
                  >
                    {isSearching ? 'Recherche...' : 'Rechercher'}
                  </Button>
                </div>
                {addressSearched && (
                  <p className="text-sm text-blue-600">
                    ✓ Adresse localisée. Cliquez maintenant sur votre toiture sur la carte satellite ci-dessous.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Cliquez sur votre toiture *
                </Label>
                <p className="text-sm text-gray-600 mb-2">
                  {!addressSearched 
                    ? 'Recherchez d\'abord votre adresse pour localiser votre toiture sur la carte satellite'
                    : 'Cliquez précisément sur votre toiture pour sélectionner les coordonnées GPS'
                  }
                </p>
                <MapSelector 
                  position={position} 
                  onPositionChange={handlePositionChange}
                  center={position || undefined}
                  zoom={addressSearched ? 19 : 13}
                />
                {position && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Toiture sélectionnée: {position[0].toFixed(6)}, {position[1].toFixed(6)}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Obtenir mon étude gratuite'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par nos conseillers pour votre projet solaire.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
