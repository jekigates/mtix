<?php

namespace App\Http\Controllers\Admin;

use App\Data\CategoryData;
use App\Data\ProductData;
use App\Enums\ProductStatusesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductStoreRequest;
use App\Http\Requests\Admin\ProductUpdateRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\LaravelData\DataCollection;

use function App\Helpers\deleteStorageImage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $categories = CategoryData::collect(Category::all());
        $products = ProductData::collect(Product::withoutGlobalScopes()->get(), DataCollection::class)->include('category');

        return Inertia::render('Admin/Products/Index', [
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $categories = CategoryData::collect(Category::all());
        $statuses = ProductStatusesEnum::toArray();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request): RedirectResponse
    {
        $product = Product::create($request->only(['name', 'description', 'recipe', 'category_id', 'status']));
        $product->image()->create(['url' => $request->file('image')->store('product-images', 'public')]);
        $product->variants()->createMany($request->variants);

        return Redirect::route('admin.products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        $product = Product::withoutGlobalScopes()->findOrFail($id);

        return Inertia::render('Admin/Products/Show', [
            'product' => ProductData::fromModel($product)->include('category', 'variants'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $product = Product::withoutGlobalScopes()->findOrFail($id);
        $categories = CategoryData::collect(Category::all());
        $statuses = ProductStatusesEnum::toArray();

        return Inertia::render('Admin/Products/Edit', [
            'categories' => $categories,
            'statuses' => $statuses,
            'product' => ProductData::fromModel($product)->include('variants'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, string $id): RedirectResponse
    {
        $product = Product::withoutGlobalScopes()->findOrFail($id);
        $product->update($request->only(['name', 'description', 'recipe', 'category_id', 'status']));

        if ($request->hasFile('image')) {
            deleteStorageImage($product->image->url);

            $product->image()->update(['url' => $request->file('image')->store('product-images', 'public')]);
        }

        $variantIds = collect($request->variants)->pluck('id')->all();

        foreach ($request->variants as $variant) {
            $product->variants()->updateOrCreate(['id' => $variant['id']], $variant);
        }

        $product->variants()->whereNotIn('id', $variantIds)->delete();

        return Redirect::route('admin.products.edit', $product->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $product = Product::withoutGlobalScopes()->findOrFail($id);
        deleteStorageImage($product->image->url);

        $product->image->delete();
        $product->variants->each->delete();
        $product->delete();

        return Redirect::route('admin.products.index');
    }
}
