<?php

//namespace App\Http\Controllers\Api;
namespace App\Http\Controllers\ServiceSelector;

use App\Http\Controllers\Controller;
use App\Models\FeedbackForm;
use Illuminate\Http\Request;

/**
* @OA\Schema(
*     schema="FeedbackForm",
*     required={"form_id","service_id","name"},
*     @OA\Property(property="form_id", type="string", format="uuid"),
*     @OA\Property(property="service_id", type="string", format="uuid"),
*     @OA\Property(property="name", type="string", maxLength=150),
*     @OA\Property(property="description", type="string", nullable=true), *     @OA\Property(property="language", type="string", maxLength=20),
*     @OA\Property(property="active", type="boolean"),
* )
*/



class FeedbackFormController extends Controller
{
    /**
     * Display a listing of the feedback forms.
     */

/**
* @OA\Info(
    * version="1.0.0",
      *title="Customer Satisfaction API",
     *description="API documentation for Feedback Forms",
      *@OA\Contact(
     *     email="support@example.com"
      *)
*)
*/

/**
* @OA\Get(
*     path="/api/feedback-forms",
*     summary="Get list of active feedback forms",
*     tags={"FeedbackForms"},
*     @OA\Response(
*         response=200,
 *         description="List of active feedback forms",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/FeedbackForm"))
 *     ),
 * )
 */








    public function index()
    {
        $forms = FeedbackForm::where('active', true)->paginate(10);

    return response()->json([
        'data' => $forms->items(),
        'current_page' => $forms->currentPage(),
        'last_page' => $forms->lastPage(),
        'per_page' => $forms->perPage(),
        'total' => $forms->total(),
    ]);
    }

    /**
     * Store a newly created feedback form.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|uuid|exists:services,service_id',
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'language' => 'nullable|string|max:20',
            'active' => 'nullable|boolean',
        ]);

        $form = FeedbackForm::create($validated);

        return response()->json($form, 201);
    }

    /**
     * Display the specified feedback form.
     */
    public function show($form_id)
    {
        $form = FeedbackForm::findOrFail($form_id);
        return response()->json($form);
    }

    /**
     * Update the specified feedback form.
     */
    public function update(Request $request, $form_id)
    {
        $form = FeedbackForm::findOrFail($form_id);

        $validated = $request->validate([
            'service_id' => 'sometimes|required|uuid|exists:services,service_id',
            'name' => 'sometimes|required|string|max:150',
            'description' => 'nullable|string',
            'language' => 'nullable|string|max:20',
            'active' => 'nullable|boolean',
        ]);

        $form->update($validated);

        return response()->json($form);
    }

    /**
     * Remove the specified feedback form.
     */
    public function destroy($form_id)
    {
        $form = FeedbackForm::findOrFail($form_id);
        $form->delete();

        return response()->json(null, 204);
    }
}
